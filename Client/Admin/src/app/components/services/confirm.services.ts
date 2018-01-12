import { Injectable, Component ,TemplateRef} from '@angular/core';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Injectable()

// @Component({
//     template:
//   })
export class ConfirmService {
    template = `<ng-template >
                    <div class="modal-header">
                    <h4 class="modal-title pull-left">Modal</h4>
                    <button type="button" class="close pull-right" aria-label="Close" (click)="modalRef.hide()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    This is a modal.
                    </div>
                </ng-template>`;
    // modalRef: BsModalRef;
    // constructor(private modalService: BsModalService) {}
    // display(){
    //   this.modalRef = this.modalService.show(this.template);
    // }
}
