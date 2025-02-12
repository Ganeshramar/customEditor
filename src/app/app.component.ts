import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomEditorComponent } from './custom-editor/custom-editor.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CustomEditorComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'custom-editor-app';
  editorForm = new FormGroup({
    editorContent: new FormControl('') // Initialize FormControl
  });
}
