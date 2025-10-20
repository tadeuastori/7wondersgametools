import { Injectable } from '@angular/core';
import { ILanguage } from '../models/language/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  private languageList: ILanguage[] = [
    { code: 'en-ca', language: 'English', icon: 'en-ca' },
    // { code: 'pt-br', name: 'Portugues Brasil', icon: '/assets/images/flags/br-flag.svg' },
  ];

  public getLanguageList(): ILanguage[] {
    return this.languageList;
  }
}
