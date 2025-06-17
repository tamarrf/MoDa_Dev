import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, ViewChildren, QueryList, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { trace, tick, empty, clone, download } from "ems-web-app-utils";
import { LoaderService } from "ems-web-app-loader";
import { MessagesService, MessageType, MessagePosition} from "ems-web-app-messages";
import { ModalService, ModalData } from "ems-web-app-modal";
import { NavigationService, INavigationState } from "ems-web-app-navigation";
import { validateEmail } from "../../utils/methods.utils";

import { AppService, HttpService } from "../../services";
import { Page } from "../../classes";
import * as _ from "underscore";
import * as papa from "papaparse";

@Component({
  selector: 'teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.less']
})
export class TeachersComponent implements OnInit {

  @ViewChild("teacherCreate") createTeacherTemplate!: TemplateRef<any>;
  @ViewChild("teacherImport") importTeacherTemplate!: TemplateRef<any>;
  @ViewChild("uploader") uploadButton!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public source: any;
  public formControl = new FormControl('');
  public settings: FormGroup;
  public dataSource!: MatTableDataSource<any[]>;
  public currentTeacher: any;
  public importData: any = {};
  public dir: string = (window as any).netlogo.dir;

  constructor(private app: AppService,private http: HttpService, private modal: ModalService, private loader: LoaderService , private messages: MessagesService, private navigation: NavigationService, fb: FormBuilder) {
    this.settings = fb.group({
      filtertext: '',
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initialize();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  noneChecked(): boolean {
    return _.every(this.dataSource.filteredData, (u: any) => !u.checked);
  }

  oneChecked(): boolean {
    const checked = this.dataSource.filteredData.filter((u: any) => u.checked);
    return checked.length === 1;
  }

  someChecked(source?: MatTableDataSource<any>): boolean {
    source = source ?? this.dataSource;
    const all = this.allChecked(source);
    if(all) return false;
    return _.some(source.filteredData, (u: any) => u.checked);
  }

  numberChecked(): number {
    return this.dataSource.filteredData.filter((u: any) => u.checked).length;
  }

  allChecked(source?: MatTableDataSource<any>): boolean {
    source = source ?? this.dataSource;
    return _.every(source.filteredData, (u: any) => u.checked)
  }

  setAll(checked: boolean, source?: MatTableDataSource<any>) {
    source = source ?? this.dataSource;
    source.filteredData.forEach((u: any) => u.checked = checked);
    trace(source.filteredData)
  }

  downloadRoster() {
    const columns = Object.keys(this.dataSource.data[0]).filter((s: string) => s !== "Checked");
    const data = clone(this.dataSource.filteredData);
    const csv = papa.unparse(data, { columns });
    download(csv, "teachers");
  }

  createTeacher() {
    const data = new ModalData();
    data.id = "edit-teacher";
    data.template = this.createTeacherTemplate;
    data.cancel = this.onCancelModal;
    trace(data);
    this.currentTeacher = {};
    this.modal.setCurrentModal(data);
  }

  async onCreateTeacher() {
    
    try {
      this.loader.show();
      this.dataSource.data = await this.http.createTeachers([ this.currentTeacher ]);
      this.loader.hide();
      this.modal.setCurrentModal(null);
      await tick();
      
      this.currentTeacher = null;
      this.messages.setCurrentMessage({
            type: MessageType.Growl,
            position: MessagePosition.TopRight,
            message: `A new teacher account has been successfully created.`,
            duration: 3 });      
    } catch(error: any) {
      this.loader.hide();
      this.messages.setCurrentMessage({
            type: MessageType.Snackbar,
            position: MessagePosition.TopCenter,
            message: `There was an error creating the new teacher account. Please confirm that the email address is well formatted and unique.`,
            duration: 3 }); 
    }

  }

  saveDisabled() {
    const incomplete = empty(this.currentTeacher["First Name"]) ||
                        empty(this.currentTeacher["Last Name"]) ||
                        empty(this.currentTeacher["Email"]) ||
                        empty(this.currentTeacher["Teacher Number"]);

    const otherTeachers = this.dataSource.data.filter((t: any) => t.Id !== this.currentTeacher.Id);
    const used = otherTeachers.find((t:any) => t["Teacher Number"]?.toString() === this.currentTeacher["Teacher Number"]);
    return !!used || incomplete;
  }

  importTeachers() {
    const data = new ModalData();
    data.id = "teacher-import";
    data.cancel = () => {
      this.onCancelModal();
      this.importData = {};
    };
    data.template = this.importTeacherTemplate;
    this.importData.modal = data;
    this.modal.setCurrentModal(data);
  }

  findCsv() {
    this.uploadButton.nativeElement.click();
  }

  onFileSelect($event: any) {
    const file = $event.target.files[0];
    const output = papa.parse(file, { skipEmptyLines: "greedy" ,complete: this.processCSV });
  }

  private processCSV = (results: any) => {
    const header = results.data[0];
    const columns = ["Teacher Number", "First Name", "Last Name", "Email"];
    const headerErrorMsg = "Please make sure the header row is populated with the following columns: Teacher Number, First Name, Last Name, Email. They ARE case sensitive.";
    const currentTeachers = this.dataSource.data;
    const teachers = results.data.slice(1).map((teacher: any) => {
      return {
        "Email": teacher[header.indexOf("Email")],
        "First Name": teacher[header.indexOf("First Name")],
        "Last Name": teacher[header.indexOf("Last Name")],
        "Teacher Number": teacher[header.indexOf("Teacher Number")]
      }
    });
    
    let valid = true;


    if(empty(header)) return window.alert(headerErrorMsg);

    columns.forEach((h: string) => { 
      if(header.indexOf(h) === -1) valid = false;
    });

    if(!valid) return window.alert(headerErrorMsg);

    const list = teachers.concat(currentTeachers);

    teachers.forEach((teacher: any) => {
      teacher.duplicateEmail = list.filter((t: any) => t.Email === teacher.Email).length > 1;
      teacher.duplicateNumber = list.filter((t: any) => t["Teacher Number"]?.toString() === teacher["Teacher Number"].toString()).length > 1;
      teacher.invalidEmail = !(!!validateEmail(teacher.Email));
      teacher.missingFirstName = empty(teacher["First Name"]);
      teacher.missingLastName = empty(teacher["Last Name"]);
      teacher.missingNumber = empty(teacher["Teacher Number"]);
      teacher.getStatusMessage = () => {
        let response = ``;
        if(teacher.duplicateEmail) response += `<li>Duplicate email address</li>`;
        if(teacher.duplicateNumber) response += `<li>Duplicate teacher number</li>`;
        if(teacher.invalidEmail) response += `<li>Invalid email address</li>`;
        if(teacher.missingFirstName) response += `<li>Missing first name</li>`;
        if(teacher.missingLastName) response += `<li>Missing last name</li>`;
        if(teacher.missingNumber) response += `<li>Missing teacher number</li>`;

        if(!response.length) return `<i class="fa-solid fa-circle-check"></i>`;
        else return `<ul>${response}</ul>`;
      }
    });

    this.importData.hasErrors = teachers.reduce((a: boolean,t: any) => {
      return a || (t.duplicateEmail || t.duplicateNumber || t.invalidEmail || t.missingFirstName || t.missingLastName || t.missingNumber)
    } , false);
    this.importData.columns = columns;
    this.importData.teachers = new MatTableDataSource(teachers);
    this.importData.modal.classes = [ "expanded" ];
  }

  async finalizeImportTeachers() {
    const teachers = this.importData.teachers.data;

    try {
      this.loader.show();
      this.dataSource.data = await this.http.createTeachers(teachers);
      this.loader.hide();
      this.modal.setCurrentModal(null);
      await tick();
      
      this.importData = {};
      
      this.messages.setCurrentMessage({
            type: MessageType.Growl,
            position: MessagePosition.TopRight,
            message: `Your new teacher accounts have been successfully created.`,
            duration: 3 });      
    } catch(error: any) {
      this.loader.hide();
      this.messages.setCurrentMessage({
            type: MessageType.Snackbar,
            position: MessagePosition.TopCenter,
            message: `There were one or more errors when trying to create these accounts. Please reload the page, review the current roster and determine which users might have been affected.`,
            duration: 10 }); 
    }
  }

  async enableUsers() {
    const users = this.dataSource.filteredData
                    .filter((u: any) => u.checked)
                    .map((u: any) => u.Id);

    if(window.prompt(`You are about to enable ${users.length} teacher(s) in the system. They will now be able to access the system with their previously assigned credentials. If you are certain that you want to proceed, enter the number ${users.length} below.`) !== users.length.toString()) return;
    this.loader.show();
    const roster = await this.http.enableTeachers(users);
    this.dataSource.data = roster;
    this.loader.hide();

    this.messages.setCurrentMessage({
          type: MessageType.Growl,
          position: MessagePosition.TopRight,
          message: `${users.length} ${users.length > 1 ? " teachers have" : " teacher has"} been successfully enabled.`,
          duration: 3 });
  }

  async disableUsers() {
    const users = this.dataSource.filteredData
                    .filter((u: any) => u.checked)
                    .map((u: any) => u.Id);

    if(window.prompt(`You are about to disable ${users.length} teacher(s) in the system. They will no longer be able to log in. If you are certain that you want to proceed, enter the number ${users.length} below.`) !== users.length.toString()) return;
    this.loader.show();
    const roster = await this.http.disableTeachers(users);
    this.dataSource.data = roster;
    this.loader.hide();

    this.messages.setCurrentMessage({
          type: MessageType.Growl,
          position: MessagePosition.TopRight,
          message: `${users.length} ${users.length > 1 ? " teachers have" : " teacher has"} been successfully suspended.`,
          duration: 3 });
  }

  loadClasses() {
    
  }

  onCancelModal = () => {
    this.modal.setCurrentModal(null);
  }

  private async initialize() {
    await tick();
    this.loader.show();
    const response = await this.http.getTeachers();
    const columns = Object.keys(response[0]);
    this.source = { columns, rows: new MatTableDataSource(response) };
    this.dataSource = this.source.rows;
    this.loader.hide();

    await tick();

    this.source.rows.paginator = this.paginator;
    this.source.rows.sort = this.sort;
    this.app.setHeader("Teacher Management");

    this.navigation.add({
        id: "teachers",
        label: "Teacher Management",
        state: { },
        page: Page.Teachers,
        instance: this,
        callback: (state: INavigationState) => {
        }
    });
  }

}
