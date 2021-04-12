import React from 'react';
import DateHelper from '../../helpers/DateHelper';
import StatusIndicator from '../design/StatusIndicator';

class InboxConversationItem extends React.Component {
  render() {
    let unreadIndicator = undefined;
    let lastMessageClass = "text-sm line-clamp-1 pr-3";
    let timeStampClass = "pt-0.5 clear-both"
    if(this.props.unread) {
      unreadIndicator = <StatusIndicator status="UNREAD" />;
      lastMessageClass += " font-semibold pl-1 align-bottom pt-1"
      timeStampClass = "pt-1.5 clear-both"
    }

    return (
      <div className="hover:bg-gray-100 cursor-pointer" onClick={this.props.onClick}>
        <div className="flex border-b border-gray-400 p-2">
          <div className="flex-none">
            <img src={this.props.userImageURL} className="h-16 w-16 rounded-full bg-gray-400"></img>
          </div>
          <div className="flex-1 pt-2 pl-4">
            <h2 className="font-semibold text-lg -mt-1">{this.props.userName}</h2>
            <div className="float-left">
              {unreadIndicator}
            </div>
            <div className={lastMessageClass}>
              {this.props.lastMessageText}
            </div>
          </div>
          <div className="flex-none pt-1">
            <div className="float-right">
              <StatusIndicator status={this.props.userStatus}></StatusIndicator>
            </div>
            <div className={timeStampClass}>
              <span className="text-sm text-gray-500">{DateHelper.getShortElapsedTimeString(this.props.lastMessageTimestamp)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InboxConversationItem;