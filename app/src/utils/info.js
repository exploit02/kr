import ReactNotification from 'react-notifications-component'
import "react-notifications-component/dist/theme.css"

const NotificationGenerator = (DOMNode, Notification, Type, Message)=>{
    return(
        DOMNode.addNotification({
            title: "Awesomeness",
            message: Message,
            type: Type,
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        })
    )
}



export {
    ReactNotification,
    NotificationGenerator
}