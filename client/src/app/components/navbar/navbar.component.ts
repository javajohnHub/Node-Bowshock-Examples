import { Component, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/api";
import { PanelMenu, BasePanelMenuItem } from "primeng/panelmenu";

@Component({
  moduleId: module.id,
  selector: "app-navbar",
  templateUrl: "navbar.component.html"
})
export class NavbarComponent {
  items: MenuItem[];
  @ViewChild('el') el: BasePanelMenuItem;
  constructor() {
    this.items = [
      {
        label: "Navigation",
        icon: "pi pi-pw pi-file",
        items: [
          {
            label: "Home",
            icon: "pi pi-fw pi-external-link",
            routerLink: ["/"],
            command: ($event) => {
              console.log($event)
              this.el.handleClick($event, false);
            }
          },
          {
            label: "APOD",
            icon: "pi pi-fw pi-times",
            routerLink: ["/apod"]
          },
          {
            label: "EVA",
            icon: "pi pi-fw pi-times",
            routerLink: ["/eva"]
          },
          {
            label: "Mars",
            icon: "pi pi-fw pi-times",
            items: [
              {
                label: "Curiosity",
                icon: "pi pi-fw pi-times",
                routerLink: ["/mars/curiosity"]
              },
              {
                label: "Opportunity",
                icon: "pi pi-fw pi-times",
                routerLink: ["/mars/opportunity"]
              },
              {
                label: "Spirit",
                icon: "pi pi-fw pi-times",
                routerLink: ["/mars/spirit"]
              },
              {
                label: "Manifest",
                icon: "pi pi-fw pi-times",
                routerLink: ["/mars/manifest"]
              }
            ]
          },
          {
            label: "Neows",
            icon: "pi pi-fw pi-times",
            items: [
              {
                label: "Today",
                icon: "pi pi-fw pi-times",
                routerLink: ["/neows/today"]
              },
              {
                label: "Feed",
                icon: "pi pi-fw pi-times",
                routerLink: ["/neows/feed"]
              }
            ]
          }
        ]
      }
    ];
  }
}
