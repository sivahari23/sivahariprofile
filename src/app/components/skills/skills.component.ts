import { Component, computed, signal } from '@angular/core';

type Category = 'All' | 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'Generative AI' | 'Tools & Others';
interface Technology { name: string; icon: string; style: string; category: Exclude<Category, 'All'>; }

@Component({selector:'app-skills',templateUrl:'./skills.component.html',styleUrl:'./skills.component.css'})
export class SkillsComponent {
  readonly categories: Category[] = ['All','Frontend','Backend','Cloud & DevOps','Generative AI','Tools & Others'];
  readonly activeCategory = signal<Category>('All');
  readonly technologies: Technology[] = [
    {name:'Angular',icon:'A',style:'angular',category:'Frontend'},{name:'TypeScript',icon:'TS',style:'ts',category:'Frontend'},{name:'JavaScript',icon:'JS',style:'js',category:'Frontend'},{name:'HTML5',icon:'5',style:'html',category:'Frontend'},{name:'CSS3',icon:'3',style:'css',category:'Frontend'},
    {name:'Node.js',icon:'⬡',style:'node',category:'Backend'},{name:'Express.js',icon:'ex',style:'express',category:'Backend'},{name:'Java',icon:'♨',style:'java',category:'Backend'},{name:'Spring Boot',icon:'●',style:'spring',category:'Backend'},{name:'PostgreSQL',icon:'▧',style:'postgres',category:'Backend'},
    {name:'AWS',icon:'aws',style:'aws',category:'Cloud & DevOps'},{name:'Lambda',icon:'λ',style:'lambda',category:'Cloud & DevOps'},{name:'API Gateway',icon:'▥',style:'gateway',category:'Cloud & DevOps'},{name:'S3',icon:'⬢',style:'s3',category:'Cloud & DevOps'},{name:'CloudWatch',icon:'☁',style:'cloud',category:'Cloud & DevOps'},
    {name:'Amazon Bedrock',icon:'AI',style:'bedrock',category:'Generative AI'},{name:'RAG',icon:'⌘',style:'rag',category:'Generative AI'},{name:'OpenAI',icon:'◎',style:'openai',category:'Generative AI'},
    {name:'Docker',icon:'🐳',style:'docker',category:'Tools & Others'},{name:'Git',icon:'◆',style:'git',category:'Tools & Others'}
  ];
  readonly visibleTechnologies = computed(() => this.activeCategory() === 'All' ? this.technologies : this.technologies.filter(item => item.category === this.activeCategory()));
  selectCategory(category: Category) { this.activeCategory.set(category); }
}
