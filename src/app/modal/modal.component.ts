import {
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalConfig } from '../model/modal.config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Review } from '../model/review';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
@Injectable()
export class ModalComponent implements OnInit{
  @Input() modalConfig!: ModalConfig;
  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>
  private modalRef!: NgbModalRef
  

  // @Output() closeEvent = new EventEmitter();
  // @Output() submitEvent = new EventEmitter();

  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {
    
  }

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent)
      this.modalRef.result.then(resolve, resolve)
    })
  }

  close() {
    // this.modalConfig.onSubmit();
    this.modalRef.close()
  }

  dismiss() {
    this.modalRef.dismiss()
  }
}
