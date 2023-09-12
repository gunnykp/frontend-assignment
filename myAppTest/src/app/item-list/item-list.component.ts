// ประกาศประเภทของอ็อบเจ็กต์
interface Item {
  type: string;
  name: string;
  selected?: boolean; // เพิ่มตัวเลือก 'selected' ที่อาจจะมีหรือไม่มี
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  items: Item[] = [ // กำหนดประเภทของ items
    { type: 'Fruit', name: 'Apple' },
    { type: 'Vegetable', name: 'Broccoli' },
    { type: 'Vegetable', name: 'Mushroom' },
    { type: 'Fruit', name: 'Banana' },
    { type: 'Vegetable', name: 'Tomato' },
    { type: 'Fruit', name: 'Orange' },
    { type: 'Fruit', name: 'Mango' },
    { type: 'Fruit', name: 'Pineapple' },
    { type: 'Vegetable', name: 'Cucumber' },
    { type: 'Fruit', name: 'Watermelon' },
    { type: 'Vegetable', name: 'Carrot' },
  ];

  selectedItemsFruit: Item[] = []; 
  selectedItemsVegetable: Item[] = []; 
  selectedItemName: any;
  selectedItem: any;
  
  selectItem(item: Item) {
    this.selectedItemName = item.name;
    this.selectedItem = item;
  }

  submitForm() {
    if (!this.selectedItem.selected) {
      this.selectedItem.selected = true;
      if (this.selectedItem.type === 'Fruit') {
        this.selectedItemsFruit.push(this.selectedItem);
      } else if (this.selectedItem.type === 'Vegetable') {
        this.selectedItemsVegetable.push(this.selectedItem);
      }
    }
    setTimeout(() => {
      this.deselectItem(this.selectedItem);
    }, 5000);
  }


  deselectItem(selectedItem: Item) {
    if (selectedItem.type === 'Fruit') {
      const index = this.selectedItemsFruit.indexOf(selectedItem);
      if (index > -1) {
        this.selectedItemsFruit.splice(index, 1);
        selectedItem.selected = false;
      }
    } else if (selectedItem.type === 'Vegetable') {
      const index = this.selectedItemsVegetable.indexOf(selectedItem);
      if (index > -1) {
        this.selectedItemsVegetable.splice(index, 1);
        selectedItem.selected = false;
      }
    }
  }


}
