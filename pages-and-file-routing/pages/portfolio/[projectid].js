import { useRouter } from "next/router";

export default function PortfolioProjectPage() {
  const router = useRouter();

  // portfolio/[projectid]
  console.log(router.pathname);
  // {projectid:"value"}
  console.log(router.query);

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
}
