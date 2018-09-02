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
        label: "Node-Bowshock",
        items: [
          {
            label: "Home",
            routerLink: ["/"],
            routerLinkActiveOptions: {exact: true},
            command: (event: any) => {
              console.log(this.el);
              this.el.model[0].expanded = false;
            }
          },
          {
            label: "APOD",
            routerLink: ["/apod"],
            command: (event: any) => {
              this.el.model[0].expanded = false;
            }
          },
          {
            label: "EVA",
            routerLink: ["/eva"],
            command: (event: any) => {
              this.el.model[0].expanded = false;
            }
          },
          {
            label: "Mars",
            items: [
              {
                label: "Curiosity",
                routerLink: ["/mars/curiosity"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Opportunity",
                routerLink: ["/mars/opportunity"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Spirit",
                routerLink: ["/mars/spirit"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Manifest",
                routerLink: ["/mars/manifest"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
            ]
          },
          {
            label: "Neows",
            items: [
              {
                label: "Today",
                routerLink: ["/neows/today"],
                command: (event: any) => {
                  this.el.model[0].expanded = false;
                }
              },
              {
                label: "Feed",
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
