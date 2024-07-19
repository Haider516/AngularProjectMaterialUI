import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, Input, input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { MatTreeModule } from '@angular/material/tree';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { TabsComponent } from '../tabs/tabs.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';


export class TodoItemNode {
  children!: TodoItemNode[];
  item!: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item!: string;
  level!: number;
  expandable!: boolean;
  hasChild!: boolean; // new property
  updating!: boolean;

}

/**
 * The Json object for to-do list data.
 */

const usersCV = {
  cvs: {
    JohnDoe: {
      summary: "Experienced software engineer with a passion for developing innovative programs.",
      experience: [
        {
          company: "Tech Solutions",
          position: "Senior Software Engineer",
          duration: "2015-2020",
          responsibilities: "Led a team of 10 in developing a new software platform, reducing processing time by 30%."
        },
        {
          company: "Innovate Inc.",
          position: "Software Developer",
          duration: "2012-2015",
          responsibilities: "Developed and maintained web applications, improving user satisfaction by 25%."
        }
      ]
    },
    JaneSmith: {
      summary: "Results-driven marketing professional with over 10 years of experience in digital marketing.",
      experience: [
        {
          company: "MarketPro",
          position: "Marketing Manager",
          duration: "2016-2021",
          responsibilities: "Increased online sales by 40% through targeted marketing campaigns."
        },
        {
          company: "AdVentures",
          position: "Marketing Specialist",
          duration: "2010-2016",
          responsibilities: "Developed and executed marketing strategies that boosted brand awareness by 50%."
        }
      ]
    },
    Haider: {
      summary: "Dynamic and motivated professional with a proven record of generating and building relationships.",
      experience: [
        {
          company: "Global Tech",
          position: "Project Manager",
          duration: "2018-2023",
          responsibilities: "Managed multiple projects, ensuring timely delivery and adherence to budget constraints."
        },
        {
          company: "Innovative Solutions",
          position: "Business Analyst",
          duration: "2014-2018",
          responsibilities: "Analyzed business needs and implemented solutions that increased efficiency by 20%."
        }
      ]
    },
    SarahLee: {
      summary: "Creative graphic designer with over 8 years of experience in visual communication.",
      experience: [
        {
          company: "Creative Studio",
          position: "Lead Designer",
          duration: "2017-2022",
          responsibilities: "Designed branding materials that enhanced company image and attracted new clients."
        },
        {
          company: "DesignWorks",
          position: "Graphic Designer",
          duration: "2012-2017",
          responsibilities: "Created visual content for various media, increasing engagement by 35%."
        }
      ]
    },
    MarkDavis: {
      summary: "Seasoned financial analyst with a strong background in data analysis and financial planning.",
      experience: [
        {
          company: "Finance Corp",
          position: "Senior Financial Analyst",
          duration: "2016-2021",
          responsibilities: "Conducted financial analysis that supported strategic decision-making and improved profitability."
        },
        {
          company: "Money Matters",
          position: "Financial Analyst",
          duration: "2011-2016",
          responsibilities: "Prepared financial reports and forecasts that guided company investments and budgeting."
        }
      ]
    }
  }
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(usersCV, 0);
    console.log('data', data);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    // changes for adding child
    debugger
    if (!parent.children)
      parent.children = [];

    parent.children.push({ item: name } as TodoItemNode);

    this.dataChange.next(this.data);
  }


  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }


  deleteItem(parentNode: TodoItemNode | undefined, node: TodoItemNode) {
    debugger
    if (parentNode === undefined) {
      this.data.shift();
    }
    else {
      const index = parentNode!.children.indexOf(node);
      debugger
      if (index !== -1) {
        parentNode!.children.splice(index, 1);
        debugger
      }
    }

    this.dataChange.next(this.data);

  }

  // detectingchange() {

  //   this.dataChange.next(this.data);
  //   debugger
  // }


  //to update the item value 

  updateItemNode(node: TodoItemNode, updateditem: string) {
    node.item = updateditem;
    this.dataChange.next(this.data);
  }

}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-tree-with-check-box',
  standalone: true,
  imports: [MatIconModule,CommonModule, MatTreeModule, MatIcon, MatCheckbox, MatLabel,MatError, MatFormField, MatInput,ButtonComponent,
    TabsComponent, MatCard, MatCardContent, CommonModule, MatCard, MatCardContent, MatCardHeader, MatCardModule,FormsModule
  ],
  templateUrl: './tree-with-check-box.component.html',
  styleUrl: './tree-with-check-box.component.css',
  providers: [ChecklistDatabase],
})

export class TreeWithCheckBoxComponent {
  /** Map from flat node to nested node.
   *  This helps us finding the nested node to be modified */

  private num: number = 0;
  private tempNode!: TodoItemNode;
  private tempNodeparent!: TodoItemNode | undefined;

  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  constructor(private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    // 
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  // isEvenIndex = (_: number, node: TodoItemFlatNode) => this.treeControl.dataNodes.indexOf(node) % 2 === 0;

  istrue = () => this.num === 1 ? true : false;

  //
  toupdate = (node: TodoItemFlatNode) => node.updating = true;
  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    debugger
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;

    //it was previously flatNode.expandable = !!node.children?.length;
    // causing an  issue for every  item to be expandable 
    flatNode.expandable = !!node.children?.length; // edit this to true to make it always expandable
    // add this line. this property will help 
    //  to hide the expand button in a node
    flatNode.hasChild = !!node.children?.length;
    flatNode.updating = false;
    debugger
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    //debugger
    return flatNode;
  }



  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    debugger
    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
    debugger
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    debugger
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    debugger
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);

    debugger
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
    debugger
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    //get parent node 
    const parentNode = this.getParentNode(node);
    const parentNode1 = this.flatNodeMap.get(parentNode!);
    debugger
    if (parentNode1?.item === itemValue) {
      console.log("not poosible ");
    } else {
      this._database.updateItem(nestedNode!, itemValue);
    }

  }

  deleteNode(node: TodoItemFlatNode) {
    //  const parentNode = this.flatNodeMap.get(node);
    const parentNode = this.getParentNode(node);

    const parentNode1 = this.flatNodeMap.get(parentNode!);
    const nodenew = this.flatNodeMap.get(node)
    debugger
    // console.log("Node:", node.);
    //  this._database.deleteItem( this.flatNodeMap.get(node)!);

    this._database.deleteItem(parentNode1!, nodenew!);


  }


  //the function is used  to save value to the temp data for updating 
  //it is the first function that  is invoked 
  updateNode(node: TodoItemFlatNode) {

    const parentNode = this.getParentNode(node);
    const parentNode1 = this.flatNodeMap.get(parentNode!);
    const nodenew = this.flatNodeMap.get(node)
    debugger
    this.num += 1;
    this.tempNode = nodenew!;
    this.tempNodeparent = parentNode1!;
    // console.log("Node:", node.);
    // this._database.detectingchange();

    //  this._database.updateItem(parentNode1!);
  }

  //this works when i click  the  save button forthe updated field
  getupdatedValue(node: TodoItemFlatNode, item: string) {
    debugger
    // console.log(item);
    // const parentNode = this.getParentNode(node);
    // const parentNode1 = this.flatNodeMap.get(parentNode!);
    const nodenew = this.flatNodeMap.get(node)
    // nodenew?.item != item;
    //   console.log(nodenew);
    this.tempNodeparent = undefined;
    // this.dataSource.data = [...this.dataSource.data];
    //  this.num -= 1;
    this._database.updateItemNode(nodenew!, item);
  }

  updateNodeextra(node: TodoItemFlatNode) {
    this.toupdate(node);
    debugger

    // debugger
    // this.num += 1;
    // this.tempNode = nodenew!;
    // this.tempNodeparent = parentNode1!;
    // console.log("Node:", node.);
    // this._database.detectingchange();

    //  this._database.updateItem(parentNode1!);
  }


}

