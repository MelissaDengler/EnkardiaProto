<div className="absolute right-4 mt-2 w-80 bg-white rounded-xl shadow-lg border 
                border-gray-100/50 overflow-hidden">
  <div className="p-4 bg-gradient-to-b from-white to-[hsl(var(--navy-50))]">
    <h3 className="font-medium text-gray-900">Notifications</h3>
  </div>
  <div className="divide-y divide-gray-100">
    {notifications.map((notification) => (
      <div key={notification.id} 
        className="p-4 hover:bg-[hsl(var(--navy-50))] transition-colors">
        <p className="font-medium text-gray-900">{notification.title}</p>
        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
        <p className="text-xs text-gray-400 mt-2">{formatDate(notification.date)}</p>
      </div>
    ))}
  </div>
</div> 