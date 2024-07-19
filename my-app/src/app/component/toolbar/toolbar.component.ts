import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCommonModule, ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonComponent } from '../button/button.component';
import { DialogElementsExample } from '../dialog/dialog.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule,DialogElementsExample,MatCommonModule,ButtonComponent, MatToolbarModule, MatIconModule,MatBadgeModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Input()color: ThemePalette
}
