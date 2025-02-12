import { Component, ElementRef, ViewChild } from '@angular/core';
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
    editorContent: new FormControl('')
  });

  @ViewChild('hiddenCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  downloadContent(fileType?: string) {
    const content = this.editorForm.value.editorContent || '';

    if (fileType === 'image') {
      this.convertTextToImage(content);
    } else {
      // Download as text file
      const blob = new Blob([content], { type: 'text/plain' });
      this.triggerDownload(blob, 'editor-content.txt');
    }
  }

  convertTextToImage(text: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const canvasWidth = 800;
    const canvasHeight = 400;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // Background color
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Text styles
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Split text into multiple lines
    const words = text.split(' ');
    let line = '';
    const lineHeight = 30;
    let y = 20;

    words.forEach((word) => {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > canvasWidth - 40) {
        ctx.fillText(line, 20, y);
        line = word + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    });

    ctx.fillText(line, 20, y);

    // Convert canvas to an image and download
    canvas.toBlob((blob) => {
      if (blob) {
        this.triggerDownload(blob, 'editor-content.png');
      }
    }, 'image/png');
  }

  triggerDownload(blob: Blob, filename: string) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
