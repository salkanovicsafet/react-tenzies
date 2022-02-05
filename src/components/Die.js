export default function Die(props) {
  return (
    <div
      onClick={() => props.toggleHold(props.id)}
      className={props.isHeld ? "die die--held" : "die"}
    >
      {props.value}
    </div>
  );
}
