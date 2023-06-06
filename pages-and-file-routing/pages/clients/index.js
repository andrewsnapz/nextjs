import Link from "next/link";

export default function ClientsPage() {
  const clients = [
    { id: "max", name: "Maximilian" },
    { id: "manuel", name: "Manuel" },
  ];
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              //  href={`/clients/${client.id}`}
              href={{
                pathname: "/clients/[id]",
                query: {
                  id: client.id,
                },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}