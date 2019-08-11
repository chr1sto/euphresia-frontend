import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, UrlHandlingStrategy } from '@angular/router';
import { PageCaptionService } from './services/page-caption.service';
import { ToastService } from './services/toast.service';

@Component({
    selector: 'public',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.scss']
  })
export class PublicComponent {

  constructor(private router : Router, public pageCaption :  PageCaptionService, public toastService : ToastService)
  {
    this.getPageName(router.url);
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd)
      {
        pageCaption.caption = this.getPageName(val.url);
        pageCaption.showSeperator = this.getShowSeperator(val.url);
      }
    })
  }

  getPageName(url : string) : string
  {
    if(url.includes('home'))  return 'News & Announcments';
    if(url.includes('ranking')) return 'Ranking';
    if(url.includes('shop')) return 'Shop';
    if(url.includes('team')) return 'Team';
    if(url.includes('forgot-password')) return 'Forgot Password';
    if(url.includes('news')) return '';
    if(url.includes('verify-mail')) return 'Verify Mail';
    if(url.includes('register')) return 'Register';
    if(url.includes('download')) return 'Download';
    if(url.includes('tos')) return 'Terms of Service';
    if(url.includes('privacy-policy')) return 'Privacy-Policy';
    if(url.includes('vote')) return 'Vote';
    if(url.includes('guide')) return 'Guide';
    if(url.includes('imprint')) return 'Imprint';
    if(url.includes('account')) return 'Account';
    return 'News & Announcments';
  }

  getShowSeperator(url : string) : boolean
  {
    return !url.includes('ranking') && !url.includes('news');
  }
}
