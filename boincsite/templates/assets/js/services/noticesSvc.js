/**
 * Service to get the main contents of the Notices screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */

 angular.module('zoetropeServices')
   .factory('noticesSvc', NoticesSvc);

NoticesSvc.$inject = ['jsonSvc'];

function NoticesSvc(jsonSvc) {

 var svc = {
   get: function() {
     return jsonSvc.get('', '/notices_json', true);
   }
 }

 return svc;
}
