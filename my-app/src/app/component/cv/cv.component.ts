import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { MatTreeModule } from '@angular/material/tree';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { TabsComponent } from '../tabs/tabs.component';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children!: TodoItemNode[];
  item!: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item!: string;
  level!: number;
  expandable!: boolean;
}


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

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(usersCV, 0);
    debugger
    // Notify the change.
    this.dataChange.next(data);
  }

  /**Json object, or 
   * Build the file structure tree. The `value` is the a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
     debugger
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;
         debugger
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
    if (parent.children) {
      debugger
      parent.children.push({ item: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}






@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [MatIconModule, MatTreeModule, MatIcon, MatCheckbox, MatLabel, MatFormField, MatInput,
    TabsComponent, MatCard, MatCardContent, MatCardHeader, MatCardModule
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css',
  providers: [ChecklistDatabase],
})

export class CvComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
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
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
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

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    debugger
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item ? existingNode : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    debugger
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
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

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    debugger
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
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
   // let x=this.getChildren(node: TodoItemFlatNode)
    debugger
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    debugger
    node.expandable = true;
    const nestedNode = this.flatNodeMap.get(node);

    this._database.updateItem(nestedNode!, itemValue);
  }
}
