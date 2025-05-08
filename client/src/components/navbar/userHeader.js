const UserHeader = () => {
  return (
    <div className="flex items-center">
      <img
        src="https://via.placeholder.com/40"
        alt="User Avatar"
        className="rounded-full mr-2"
      />
      <span className="text-gray-700">John Doe</span>
    </div>
  );
};

export default UserHeader;