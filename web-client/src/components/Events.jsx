export function Events({ events }) {
  return (
    <ul>
      {events
        .slice()
        .reverse()
        .map((event, index) => (
          <li key={index}>{event}</li>
        ))}
    </ul>
  );
}
