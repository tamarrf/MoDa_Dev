import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, TemplateRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ViewContainerService } from "ems-web-app-view-container";
import { LoaderService } from "ems-web-app-loader";
import { ModalService, ModalData } from "ems-web-app-modal";
import { MessagesService, MessagePosition, MessageType} from "ems-web-app-messages";
import { trace, tick, empty, clone, download } from "ems-web-app-utils";
import { NavigationService, INavigationState } from "ems-web-app-navigation";
import { AppService, HttpService } from "../../services";
import { Page } from "../../classes";

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import * as _ from "underscore";
import * as papa from "papaparse";

@Component({
  selector: 'classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['../teachers/teachers.component.less','./classroom.component.less']
})
export class ClassroomComponent implements OnInit {

  @ViewChild("studentCreate") studentCreateTemplate!:TemplateRef<any>;
  @ViewChild("classroomEdit") classroomEditTemplate!:TemplateRef<any>;
  @ViewChild("studentImport") importStudentTemplate!:TemplateRef<any>;
  @ViewChild("uploader") uploadButton!: ElementRef;
  @ViewChildren(MatSort) sort!: QueryList<MatSort>;
  @ViewChildren(MatPaginator) paginator!: QueryList<MatPaginator>;

  public currentClassroomModel: any;
  public currentClassroom: any;
  public currentStudent: any;
  public teachers: any[] = [];
  public classrooms: any[] = [];
  public dataSource!: MatTableDataSource<any[]>;
  public source?: any;
  public settings: FormGroup;
  public importData: any = {};
  public dir: string = (window as any).netlogo.dir;
  public editing: boolean = false;

  constructor(private app: AppService, private http: HttpService, private messages: MessagesService,private viewContainer: ViewContainerService, private loader: LoaderService, private modal: ModalService, private navigation: NavigationService, fb: FormBuilder) {
    this.settings = fb.group({
      filtertext: '',
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initialize();
  }

  downloadRoster() {
    const columns = Object.keys(this.dataSource.data[0]).filter((s: string) => s !== "Checked");
    const data = clone(this.dataSource.filteredData);
    const csv = papa.unparse(data, { columns });
    download(csv, this.currentClassroom.Name);
  }

  editStudent() {
    const student = this.dataSource.data.find((s: any) => s.checked);
    const data = new ModalData();
    data.id = "edit-student";
    data.template = this.studentCreateTemplate;
    data.cancel = this.onCancelModal;
    this.currentStudent = clone(student);
    this.modal.setCurrentModal(data);
  }

  async enableStudents() {
    const users = this.dataSource.filteredData
                    .filter((u: any) => u.checked)
                    .map((u: any) => u.Id);

    if(window.prompt(`You are about to enable ${users.length} student(s) in the system. They will now be able to access the system with their previously assigned credentials. If you are certain that you want to proceed, enter the number ${users.length} below.`) !== users.length.toString()) return;
    this.loader.show();
    const roster = await this.http.enableStudents(this.currentClassroom.Id, users);
    this.dataSource.data = roster;
    this.loader.hide();

    this.messages.setCurrentMessage({
          type: MessageType.Growl,
          position: MessagePosition.TopRight,
          message: `${users.length} ${users.length > 1 ? " students have" : " student has"} been successfully enabled.`,
          duration: 3 });
  }

  async disableStudents() {
    const users = this.dataSource.filteredData
                    .filter((u: any) => u.checked)
                    .map((u: any) => u.Id);

    if(window.prompt(`You are about to disable ${users.length} student(s) in the system. They will no longer be able to log in. If you are certain that you want to proceed, enter the number ${users.length} below.`) !== users.length.toString()) return;
    this.loader.show();
    const roster = await this.http.disableStudents(this.currentClassroom.Id, users);
    this.dataSource.data = roster;
    this.loader.hide();

    this.messages.setCurrentMessage({
          type: MessageType.Growl,
          position: MessagePosition.TopRight,
          message: `${users.length} ${users.length > 1 ? " students have" : " student has"} been successfully suspended.`,
          duration: 3 });
  }

  importStudents() {
    const data = new ModalData();
    data.id = "student-import";
    data.cancel = () => {
      this.onCancelModal();
      this.importData = {};
    };
    data.template = this.importStudentTemplate;
    this.importData.modal = data;
    this.modal.setCurrentModal(data);
  }

  findCsv() {
    this.uploadButton.nativeElement.click();
  }

  onFileSelect($event: any) {
    const file = $event.target.files[0];
    const output = papa.parse(file, { skipEmptyLines: "greedy" ,complete: (results: any) => this.processCSV(results) });
  }

  private async processCSV(results: any) {
    trace(results);
    const header = results.data[0];
    const columns = ["Student Number"];
    const headerErrorMsg = "Please make sure the header row is populated with the following columns: Student Number. They ARE case sensitive.";
    const students = results.data.slice(1).map((student: any) => {
      return {
        "First Name": "Student",
        "Last Name": "User",
        "Student Number": student[header.indexOf("Student Number")]
      }
    });
    
    let valid = true;

    if(empty(header)) return window.alert(headerErrorMsg);

    columns.forEach((h: string) => { 
      if(header.indexOf(h) === -1) valid = false;
    });

    if(!valid) return window.alert(headerErrorMsg);

    const numbers = await this.http.getStudentNumbers(this.currentClassroom.Teacher.Id);
    const currentStudents = numbers.map((n: number) => {
      return { "Student Number": n }
    });

    const list = students.concat(currentStudents);

    students.forEach((student: any) => {
      student.duplicateNumber = list.filter((t: any) => t["Student Number"]?.toString() === student["Student Number"].toString()).length > 1;
      student.missingFirstName = empty(student["First Name"]);
      student.missingLastName = empty(student["Last Name"]);
      student.missingNumber = empty(student["Student Number"]);
      student.getStatusMessage = () => {
        let response = ``;
        if(student.duplicateNumber) response += `<li>Student number in use</li>`;
        if(student.missingFirstName) response += `<li>Missing first name</li>`;
        if(student.missingLastName) response += `<li>Missing last name</li>`;
        if(student.missingNumber) response += `<li>Missing student number</li>`;

        if(!response.length) return `<i class="fa-solid fa-circle-check"></i>`;
        else return `<ul>${response}</ul>`;
      }
    });

    this.importData.hasErrors = students.reduce((a: boolean,t: any) => {
      return a || (t.duplicateNumber || t.missingFirstName || t.missingLastName || t.missingNumber)
    } , false);
    this.importData.columns = columns;
    this.importData.students = new MatTableDataSource(students);
    this.importData.modal.classes = [ "expanded" ];
  }

  async finalizeImportStudents() {
    const students = this.importData.students.data;

    try {
      this.loader.show();
      this.dataSource.data = await this.http.createStudents(students, this.currentClassroom.Id, this.currentClassroom.Teacher.Id);
      this.loader.hide();
      this.modal.setCurrentModal(null);
      await tick();
      
      this.importData = {};
      
      this.messages.setCurrentMessage({
            type: MessageType.Growl,
            position: MessagePosition.TopRight,
            message: `Your new student accounts have been successfully created.`,
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

  createStudent() {
    const data = new ModalData();
    data.id = "edit-student";
    data.template = this.studentCreateTemplate;
    data.cancel = this.onCancelModal;
    this.currentStudent = { "First Name": "Student", "Last Name": "User", "NumStudents": 1 };
    this.modal.setCurrentModal(data);
  }

  async onCreateStudent() {
    let valid = true;
    if(!this.currentStudent.Id) {
      valid = await this.validateStudents([ this.currentStudent ]);
    }
    
    if(!valid) {
      this.messages.setCurrentMessage({
            type: MessageType.Snackbar,
            position: MessagePosition.TopCenter,
            message: `The supplied student number is in use. Please select another.`,
            duration: 10 });
      return;
    }

    this.loader.show();
    this.dataSource.data = await this.http.createStudents([ this.currentStudent ], this.currentClassroom.Id, this.currentClassroom.Teacher.Id);
    this.loader.hide();
    this.modal.setCurrentModal(null);
  }

  async onCreateStudentAccounts() {
    this.loader.show();
    this.dataSource.data = await this.http.autoCreateStudents(this.currentStudent.NumStudents, this.currentClassroom.Id, this.currentClassroom.Teacher.Id);
    this.loader.hide();
    this.modal.setCurrentModal(null);
  }

  private validateStudents(students: any[]): Promise<any> {
    return new Promise(async (resolve: any, reject: any) => {
      const numbers = await this.http.getStudentNumbers(this.currentClassroom.Teacher.Id);
      const existing = students.filter((s: any) => numbers.indexOf(parseInt(s["Student Number"])) !== -1);
      resolve(empty(existing));
    });
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
  }

  async selectClassroom(classroom: any) {
    this.loader.show();
    this.currentClassroom = classroom;
    this.app.setHeader(`${classroom.Name} (${classroom.Teacher["First Name"]} ${classroom.Teacher["Last Name"]})`);
    this.viewContainer.setCurrentView("editor");
    const response = await this.http.getStudents(classroom.Id);
    this.dataSource = new MatTableDataSource(response);
    this.source = { rows: this.dataSource, columns: [ "Student Number", "Status" ] }
    this.loader.hide();
    await tick();

    this.paginator.changes.subscribe(() => {
      this.dataSource.paginator = this.paginator.last;
    });

    this.sort.changes.subscribe(() => {
      this.dataSource.sort = this.sort.last;
    });

    this.navigation.add({
        id: "classroom",
        label: this.currentClassroom.Name,
        state: { view: "editor" },
        page: Page.Classroom,
        instance: this,
        callback: (state: INavigationState) => {
        }
    });
  }

  createClassroom() {
    const data = new ModalData();
    data.id = "edit-classroom";
    data.cancel = this.onCancelModal;
    data.template = this.classroomEditTemplate;
    this.currentClassroomModel = {};
    this.modal.setCurrentModal(data);
  }

  async onCreateClassroom() {
    const classroom = { Name: this.currentClassroomModel.Name, Teacher: this.currentClassroomModel.Teacher.Id, NumStudents: this.currentClassroomModel.NumStudents };
    this.loader.show();
    this.classrooms = await this.http.createClassrooms([classroom]);
    this.applyTeachersToClassrooms();
    this.loader.hide();
    this.currentClassroomModel = null;
    this.modal.setCurrentModal(null);
    this.messages.setCurrentMessage({
            type: MessageType.Growl,
            position: MessagePosition.TopRight,
            message: `A new classroom has been successfully created.`,
            duration: 3 }); 
  }

  configureClassroom() {
    const data = new ModalData();
    data.id = "edit-classroom";
    data.cancel = this.onCancelModal;
    data.template = this.classroomEditTemplate;
    this.editing = true;
    this.modal.setCurrentModal(data);
    this.currentClassroomModel = clone(this.currentClassroom);
    this.currentClassroomModel.Teacher = this.teachers.find((t: any) => t.Id === this.currentClassroom.Teacher.Id);
  }

  async onUpdateClassroom() {
    const classroom = {Id: this.currentClassroom.Id, Name: this.currentClassroomModel.Name, Teacher: this.currentClassroomModel.Teacher.Id };
    this.loader.show();
    this.classrooms = await this.http.createClassrooms([classroom]);
    this.applyTeachersToClassrooms();
    this.loader.hide();
    this.currentClassroomModel = null;
    this.currentClassroom = this.classrooms.find((c: any) => c.Id == classroom.Id);
    this.modal.setCurrentModal(null);
    this.app.setHeader(`${classroom.Name} (${this.currentClassroom.Teacher["First Name"]} ${this.currentClassroom.Teacher["Last Name"]})`);
    this.messages.setCurrentMessage({
            type: MessageType.Growl,
            position: MessagePosition.TopRight,
            message: `Your classroom has been successfully updated.`,
            duration: 3 }); 
    this.editing = false;
  }

  onCancelModal = () => {
    this.modal.setCurrentModal(null);
    this.editing = false;
  }

  saveDisabled() {
    return empty(this.currentClassroomModel.Teacher) || empty(this.currentClassroomModel.Name)
  }

  saveStudentDisabled() {
    return empty(this.currentStudent["First Name"])
      || empty(this.currentStudent["Last Name"])
      || empty(this.currentStudent["Student Number"])
      || isNaN(parseInt(this.currentStudent["Student Number"]));
  }

  private async initialize() {
    await tick();
    this.loader.show();
    this.app.setHeader("Classroom Management: Class Selection");
    this.teachers = await this.http.getTeachers();
    this.classrooms = await this.http.getClassrooms();
    this.applyTeachersToClassrooms();
    this.loader.hide();
    this.viewContainer.setCurrentView("menu");

    this.navigation.add({
        id: "classroom-selection",
        label: "Classroom Selection",
        state: { view: "menu" },
        page: Page.Classroom,
        instance: this,
        callback: (state: INavigationState) => {
          this.app.setHeader("Classroom Management: Class Selection");
          this.viewContainer.setCurrentView("menu");
        }
    });
  }

  private applyTeachersToClassrooms() {
    this.classrooms.forEach((classroom: any) => {
      classroom.Teacher = this.teachers.find((teacher: any) => teacher.Id === classroom.Teacher);
    })
    trace(this.teachers, this.classrooms);
  }

}
