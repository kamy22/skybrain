import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { shareReplay } from 'rxjs/operators';
import { BaseMemory } from 'src/app/models/user-memory';
import { Store, select } from '@ngrx/store';
import { State as RootState } from '../../reducers';
import * as MemomrySelectors from '../../reducers/memory/memory.selectors';
import * as MemomryActions from '../../reducers/memory/memory.actions';
import { Memory } from 'src/app/reducers/memory/memory.model';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  memories$ = this.store.pipe(select(MemomrySelectors.selectMemories));
  error$ = this.store.pipe(select(MemomrySelectors.selectError));
  uploadForm: FormGroup;

  constructor(private store: Store<RootState>, private formBuilder: FormBuilder) {
    this.uploadForm =  this.formBuilder.group({
      file: [''],
      text: [''],
      tags: [''],
      location: ['']
    });
  }

  ngOnInit(): void {
  }

  get form(): {
    [key: string]: AbstractControl;
  } {
    return this.uploadForm.controls;
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.uploadForm.invalid) {
        return;
    }

    const memory: BaseMemory = {
      location: this.form.location.value,
      tags: this.form.tags.value.split(',').map((item: string) => item.trim()),
      text: this.form.text.value,
    };

    this.store.dispatch(MemomryActions.newMemory({ memory, file: this.form.file.value }));
    this.uploadForm.reset();
  }

  forgetMemory(memory: Memory): void {
    this.store.dispatch(MemomryActions.forgetMemory( { id: memory.id } ));
  }

  publishMemory(memory: Memory): void {
    this.store.dispatch(MemomryActions.makePublicMemory( { id: memory.id } ));
  }

  shareMemory(memory: Memory): void {
    if (memory.shareLink) {
      this.store.dispatch(MemomryActions.getShareMemoryLinkSuccess( { id: memory.id, link: memory.shareLink } ));
      return;
    }
    this.store.dispatch(MemomryActions.getShareMemoryLink( { id: memory.id } ));
  }

  trackMemory(index: number, memory: Memory): string {
    return memory.id;
  }
}
