import { AfterViewInit, Component, inject, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { LandingComponent } from './components/landing/landing.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ArchitectureComponent } from './components/architecture/architecture.component';
import { ContactComponent } from './components/contact/contact.component';
import { isPlatformBrowser } from '@angular/common';
import { Chat } from './components/chat/chat';
@Component({selector:'app-root',
    imports:[LandingComponent,
        AboutComponent,
        SkillsComponent,
        ExperienceComponent,
        ProjectsComponent,
        CertificationsComponent,
        ArchitectureComponent,
        ContactComponent,
         Chat],
templateUrl:'./app.html',
styleUrl:'./app.css'})
export class App implements AfterViewInit, OnDestroy { 
    active=signal('home');
     private platformId = inject(PLATFORM_ID);
     private observer?:IntersectionObserver;
     scrollTo(id:string){
    document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})
}
 ngAfterViewInit(){
    // this.observer=new IntersectionObserver(entries=>
    //     entries.forEach(entry=>{
    //     if(entry.isIntersecting)this.active.set(entry.target.id)})
    //     ,{rootMargin:'-45% 0px -48% 0px'});
    // document.querySelectorAll('main section[id]').forEach(section=>this.observer?.observe(section))}


    /*
     * IntersectionObserver is a browser API.
     *
     * Angular SSR runs this lifecycle method on the server too,
     * so we must make sure we are running in the browser first.
     */
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            this.active.set(entry.target.id);
          }

        });

      },
      {
        rootMargin: '-45% 0px -48% 0px'
      }
    );

    document
      .querySelectorAll('main section[id]')
      .forEach((section) => {

        this.observer?.observe(section);

      });
  }
     ngOnDestroy(){this.observer?.disconnect()} }
