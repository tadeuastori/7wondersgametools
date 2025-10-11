import { Injectable } from '@angular/core';
import { ILanguage } from '../models/language/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  private languageList: ILanguage[] = [
    { code: 'en', name: 'English', icon: 'en' },
    { code: 'pt-br', name: 'Portugues Brasil', icon: 'pt-br' },
  ];

  public getLanguageList(): ILanguage[] {
    return this.languageList;
  }
}
