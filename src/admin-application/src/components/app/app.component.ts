import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { LoaderService, LoaderType } from "ems-web-app-loader";
import { PageViewerService } from "ems-web-app-page-viewer";
import { ModalService, ModalData } from "ems-web-app-modal";
import { trace, delay, sleep, kebab, tick } from "ems-web-app-utils";
import { SanitizerType } from "ems-web-app-pipes";
import { MessagesService, MessageType, MessagePosition } from "ems-web-app-messages";
import { Page } from "../../classes";
import { AppService, HttpService, ContentService } from "../../services";
import { ViewContainerService } from "ems-web-app-view-container";
import { NavigationService, INavigationState } from "ems-web-app-navigation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild("exampleModalTemplate") template!: TemplateRef<any>;

  public initialized: boolean = false;
  public transitioning: boolean = false;
  public time: number = 0;
  public loaderDuration: number = 1000;
  public loaderSize: number = 200;
  public loading: boolean = false;
  public Page = Page;
  public currentPageClass: string = "";
  public changingHeader: boolean = false;
  public currentHeader: string = "Netlogo Content & User Administration";
  public showTeacherManagement: boolean = (window as any).netlogo.role === "admin";

  constructor(public content: ContentService, public loader: LoaderService, public viewer: PageViewerService, 
                private app: AppService, private http: HttpService, private modal: ModalService,
                private messages: MessagesService, 
                private viewContainer: ViewContainerService,
                private navigation: NavigationService) {

  }

  ngOnInit() {
    this.navigation.setPageService(this.viewer);

    this.viewer.page.subscribe(page => {
      this.currentPageClass = kebab(page ?? "");
    });

    this.app.header$.subscribe((header: string) => this.onHeaderChange(header));
  }

  ngAfterViewInit() {
    this.initialize()
  }

  showMessage() {
    this.messages.setCurrentMessage({
      type: MessageType.Growl,
      position: MessagePosition.TopRight,
      message: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      duration: 5
    });
  }

  showSnackbarMessage() {
    this.messages.setCurrentMessage({
      type: MessageType.Snackbar,
      position: MessagePosition.TopCenter,
      message: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      duration: 5
    });
  }

  showSpinner() {
    this.loading = true;
    this.loaderDuration = 1000;
    this.loaderSize = 200;
    this.loader.load(true, LoaderType.Spinner);
  }

  showEllipsis() {
    this.loading = true;
    this.loaderDuration = 600;
    this.loaderSize = 14;
    this.loader.load(true, LoaderType.Ellipsis);
  }

  hideLoader() {
    this.loading = false;
    this.loader.hide();
  }

  launchSampleModal() {
    const data = new ModalData();
    data.template = this.template;
    data.cancel = this.onCancelModal;
    this.modal.setCurrentModal(data);
  }

  public onCancelModal = () => {
    this.modal.setCurrentModal(null);
  }

  private async initialize() {
    await tick();
    this.initialized = true;
    this.viewer.setCurrentPage(Page.Home);
    this.app.setHeader(`Netlogo Content & User Administration`);
    this.navigation.add({
        id: "home",
        label: "Home",
        state: { },
        page: Page.Home,
        instance: this,
        callback: (state: INavigationState) => { }
    });
  }

  private async onHeaderChange(header: string) {
    this.changingHeader = true;
    await sleep(this.app.TRANSITION_SPEED);
    this.currentHeader = header;
    await sleep(0);
    this.changingHeader = false;
  }

}
