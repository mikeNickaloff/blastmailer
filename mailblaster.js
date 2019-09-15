/* Javascript Mail Blaster 
  Requires:  w3.js
             w3.css
             doctype html
*/

import { MailBlaster, MailBlasterOpenButton } from './mailblaster.classes.js'

/*             API endpoints: */
/*  recipients expects a JSON array of valid recipients */
const MAILBLASTER_FETCH_RECIPIENTS_API = "/mailblaster/fetch/recipients";

/* documents API expects a JSON array of valid documents */ 
const MAILBLASTER_FETCH_DOCUMENTS_API = "/mailblaster/fetch/documents";



   
