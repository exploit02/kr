import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
 
class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.dummy = this.dummy.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  dummy(){
    // console.log(this.refs.notificationContainer)
      this.refs.notificationContainer.addNotification({
        title: "Awesomeness",
        message: "Awesome Notifications!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 2000 },
        dismissable: { click: true }
      })
      
     // this.props.history.push("/login");
  }
 
  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Awesomeness",
      message: "Awesome Notifications!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
 
  render() {
    return (
      <div className="app-content">
        <ReactNotification ref='notificationContainer' />
        <button onClick={this.addNotification} className="btn btn-primary">
          Add Awesome Notification
        </button>

        <button onClick={this.dummy} className="btn btn-primary">
          Add 
        </button>
      </div>
    );
  }
}

export default Notification;