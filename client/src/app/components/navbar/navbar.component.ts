import { Component, ViewChild, ElementRef } from "@angular/core";
import { MenuItem } from "primeng/api";
import { PanelMenu, BasePanelMenuItem } from "primeng/panelmenu";

@Component({
  moduleId: module.id,
  selector: "app-navbar",
  templateUrl: "navbar.component.html"
})
export class NavbarComponent {
  items: MenuItem[];
  @ViewChild('el') el: PanelMenu;
  constructor() {
    
  }
  ngOnInit(){
    
    this.items = [
      {
        label: "Navigation",
        icon: "pi pi-pw pi-file",
        items: [
          {
            label: "Home",
            icon: "pi pi-fw pi-external-link",
            routerLink: ["/"],
            command: (event: any) => {
              console.log(this.el);
              this.el.model[0].expanded = false;
            }
          },
          {
            label: "APOD",
            icon: "pi pi-fw pi-times",
            routerLink: ["/apod"],
            command: (event: any) => {
              this.el.model[0].expanded = false;
            }
          },
          {
            label: "EVA",
            icon: "pi pi-fw pi-times",
            routerLink: ["/eva"],
            command: (event: any) => {
              this.el.model[0].expanded = false;
            }
          },
          {
            label: "Mars",
            icon: "pi pi-fw pi-times",
            items: [
              {
                label: "Curiosity",
                icon: "pi pi-fw pi-times",
                routerLink: ["/mars/curiosity"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Opportunity",
                icon: "pi pi-fw pi-times",
                routerLink: ["/mars/opportunity"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Spirit",
                icon: "pi pi-fw pi-times",
                routerLink: ["/mars/spirit"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Manifest",
                icon: "pi pi-fw pi-times",
                routerLink: ["/mars/manifest"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
            ]
          },
          {
            label: "Neows",
            icon: "pi pi-fw pi-times",
            items: [
              {
                label: "Today",
                icon: "pi pi-fw pi-times",
                routerLink: ["/neows/today"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Feed",
                icon: "pi pi-fw pi-times",
                routerLink: ["/neows/feed"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              }
            ]
          }
        ]
      }
    ];
  }
}
