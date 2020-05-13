import {Component, OnInit} from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { PostService } from '../../components/posts/post.service';
import { PostI } from 'src/app/shared/models/post.interface';

import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['imagePost','titlePost', 'contentPost', 'size', 'price', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(private postSvc: PostService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.postSvc
    .getAllPosts()
    .subscribe(posts => (this.dataSource.data = posts));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditPost(post: PostI){
    console.log('Edit post',post);
  }
  onDeletePost(post: PostI){
    
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if(result.value){
        this.postSvc.deletePostById(post).then(()=>{
          Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
        }).catch((error)=>{
          Swal.fire('Error!', 'There was an error deleting this post.', 'error');
        })
        ;
      }
    })
  }
  onNewPost(){
    this.openDialog();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    })
  }
}


