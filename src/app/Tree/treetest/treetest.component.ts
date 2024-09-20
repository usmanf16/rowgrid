import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClient } from '@angular/common/http';

// Define interfaces for the data structure
interface Child {
  id: string;
  name: string;
  checked: boolean;
}

interface Item {
  id: string;
  name: string;
  checked: boolean;
  expand: boolean;
  childs: Child[];
}

interface Group {
  id: string;
  name: string;
  items: Item[];
}

// Tree Test Component
@Component({
  selector: 'app-treetest',
  standalone: true,

  imports: [CommonModule,],
  templateUrl: './treetest.component.html',
  styleUrls: ['./treetest.component.css']
})
export class TreetestComponent {
  // Explicitly define the type for listChildChanged
  listChildChanged: Child[] = [];

  // Define the type of arr based on Group interface
  arr: Group[] = [
    {
      id: "group_1",
      name: "Group 1",
      items: [
        {
          id: "group_1.abc",
          name: "ABC",
          checked: false,
          expand: true,
          childs: [
            {
              id: "group_1.abc.action_See_List",
              name: "See List",
              checked: false
            },
            {
              id: "group_1.abc.action_Edit",
              name: "Edit",
              checked: false
            },
            {
              id: "group_1.abc.action_Delete",
              name: "Delete",
              checked: false
            },
            {
              id: "group_1.abc.action_Print",
              name: "Print",
              checked: false
            }
          ]
        },
        {
          id: "group_1.def",
          name: "DEF",
          checked: false,
          expand: true,
          childs: [
            {
              id: "group_1.def.action_See_List",
              name: "See List",
              checked: false
            },
            {
              id: "group_1.def.action_Edit",
              name: "Edit",
              checked: false
            },
            {
              id: "group_1.def.action_Delete",
              name: "Delete",
              checked: false
            },
            {
              id: "group_1.def.action_Print",
              name: "Print",
              checked: false
            }
          ]
        }
      ]
    },
    {
      id: "group_2",
      name: "Group 2",
      items: [
        {
          id: "group_2.ghi",
          name: "GHI",
          checked: false,
          expand: true,
          childs: [
            {
              id: "group_2.ghi.action_See_List",
              name: "See List",
              checked: false
            },
            {
              id: "group_2.ghi.action_Edit",
              name: "Edit",
              checked: false
            },
            {
              id: "group_2.ghi.action_Delete",
              name: "Delete",
              checked: false
            }
          ]
        },
        {
          id: "group_2.ijk",
          name: "IJK",
          checked: true,
          expand: true,
          childs: [
            {
              id: "group_2.ijk.action_Funny",
              name: "Funny",
              checked: true
            }
          ]
        },
        {
          id: "group_2.klm",
          name: "KLM",
          checked: false,
          expand: true,
          childs: [
            {
              id: "group_2.klm.action_Edit",
              name: "Edit",
              checked: true
            },
            {
              id: "group_2.klm.action_Delete",
              name: "Delete",
              checked: false
            }
          ]
        }
      ]
    }
  ];

  // Add explicit type annotations
  checkMinusSquare(item: Item): boolean {
    const count = item.childs.filter((x: Child) => x.checked === true).length;
    if (count > 0 && count < item.childs.length) {
      return true;
    } else if (count === 0) {
      return false;
    }
    return false;
  }

  checkParent(group_i: number, i: number): void {
    this.arr[group_i].items[i].checked = !this.arr[group_i].items[i].checked;
    if (this.arr[group_i].items[i].checked) {
      this.arr[group_i].items[i].childs.map((x: Child) => (x.checked = true));
    } else {
      this.arr[group_i].items[i].childs.map((x: Child) => (x.checked = false));
    }

    this.arr[group_i].items[i].childs.forEach((x: Child) => {
      if (this.listChildChanged.findIndex(el => el.id === x.id) === -1) {
        this.listChildChanged.push(x);
      }
    });
  }

  checkChild(group_i: number, parent_i: number, i: number): void {
    const child = this.arr[group_i].items[parent_i].childs[i];
    child.checked = !child.checked;

    const count = this.arr[group_i].items[parent_i].childs.filter(
      (el: Child) => el.checked === true
    ).length;

    this.arr[group_i].items[parent_i].checked = count === this.arr[group_i].items[parent_i].childs.length;

    if (this.listChildChanged.findIndex(el => el.id === child.id) === -1) {
      this.listChildChanged.push(child);
    }
  }

  getListChildChanged(): void {
    console.log(this.listChildChanged);
  }
}
