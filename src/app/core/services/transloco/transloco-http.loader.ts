import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { TranslocoLoader, Translation } from "@jsverse/transloco";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private http = inject(HttpClient);

    getTranslation(lang: string) {
        return this.http.get<Translation>(`../../../../../public/i18n/${lang}.json`);
    }
}