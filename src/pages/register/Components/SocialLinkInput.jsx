const SocialLinkInput = ({
  icon: Icon,
  name,
  value,
  onChange,
  placeholder,
}) => (
  <div className="form-input">
    <Icon style={{ marginRight: "10px" }} />
    <input
      type="url"
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default SocialLinkInput;
