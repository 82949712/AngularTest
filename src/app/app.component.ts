import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './posts/post.model';
import { PostService } from './posts/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mean';
  posts: Post[] = [];
  postsSubscription: Subscription;
  constructor(public postService: PostService) { }

  addPost(post){
    this.postService.addPost(post);
  }



  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postsSubscription = this.postService.getPostUpdatedListener().subscribe((posts) => {
      this.posts = posts;
    })
  }

  ngOnDestroy(){
    this.postsSubscription.unsubscribe();
  }

}
