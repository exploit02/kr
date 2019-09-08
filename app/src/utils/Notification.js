import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
/*alertmesage.createNotification(status,"Message")----->Call this function in your message*/
export const Notification =(Type, Message)=> {
    
        switch (Type) {
          case 'Info':
             return NotificationManager.info(Message);
          case 'Success':
            return NotificationManager.success(Message);
         
          case 'Warning':
             return NotificationManager.warning(Message);
           
          case 'Error':
              return NotificationManager.error(Message);
            // return NotificationManager.error(Message, 5000, () => {
            //   alert('callback');
            // });
           default: 
            return NotificationManager.info(Message);
      }
    
}
