import Navigation from "components/Home/Navigation";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Home() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(1);

  return (
    <div>
      <Navigation page={page} setPage={setPage} />
    </div>
  );
}
