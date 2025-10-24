import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  BookOpen,
  Search,
  Download,
  Bookmark,
  Share2,
  X,
} from "lucide-react";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  has_fulltext?: boolean;
  ebook_count?: number;

  availability?: {
    status?: "open" | "borrow_available" | "restricted" | string;
    available_to_borrow?: boolean;
    available_to_read?: boolean;
    openlibrary_work?: string;
    openlibrary_edition?: string;
  };
}

export function DigitalLibrary() {
  const [searchTerm, setSearchTerm] = useState("programming");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  // Buscar livros da Open Library
  const fetchBooks = async (query: string) => {
  setLoading(true);
  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
    );
    const data = await res.json();

    // Alguns resultados da API "search" não trazem 'availability', então vamos buscar isso em paralelo
    const booksWithAvailability = await Promise.all(
      data.docs.slice(0, 20).map(async (book: any) => {
        try {
          const availabilityRes = await fetch(
            `https://openlibrary.org${book.key}.json`
          );
          const details = await availabilityRes.json();

          return {
            ...book,
            has_fulltext: book.has_fulltext,
            ebook_count: book.ebook_count_i,
            availability: details.availability || null,
          };
        } catch {
          return book;
        }
      })
    );

    setBooks(booksWithAvailability);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
  } finally {
    setLoading(false);
  }
};

  // Buscar ao montar o componente
  useEffect(() => {
    fetchBooks(searchTerm);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(searchTerm);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Acervo Digital</h2>
        <p className="text-muted-foreground">
          Explore livros técnicos e acadêmicos da Open Library
        </p>
      </div>

      {/* Busca */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Buscar</Button>
      </form>

      {/* Resultados */}
      {loading ? (
        <p className="text-center text-muted-foreground">Carregando...</p>
      ) : books.length > 0 ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.key}
              className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => setSelectedBook(book)}
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                      : "https://via.placeholder.com/300x400?text=Sem+Capa"
                  }
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {book.author_name?.[0] || "Autor desconhecido"}
                </p>
                <Badge variant="secondary">
                  {book.first_publish_year || "Sem ano"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">Nenhum livro encontrado</p>
      )}

      {/* Modal Detalhes */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-3xl">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBook.title}</DialogTitle>
                <DialogDescription>
                  {selectedBook.author_name?.[0]}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col md:flex-row gap-6 mt-4">
                <img
                  src={
                    selectedBook.cover_i
                      ? `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`
                      : "https://via.placeholder.com/300x400?text=Sem+Capa"
                  }
                  alt={selectedBook.title}
                  className="w-48 h-64 object-cover rounded-lg shadow"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Ano de publicação:{" "}
                      <strong>{selectedBook.first_publish_year || "N/A"}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ID: <code>{selectedBook.key}</code>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button asChild>
                      <a
                        href={`https://openlibrary.org${selectedBook.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Ler na Open Library
                      </a>
                    </Button>
                    {selectedBook?.availability?.status === "open" && (
                      <Button variant="outline" asChild>
                        <a
                          href={`https://openlibrary.org${selectedBook.availability.openlibrary_edition}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Baixar PDF
                        </a>
                      </Button>
                    )}

                    {selectedBook?.availability?.status !== "open" && (
                      <Button variant="outline" asChild>
                        <a
                          href={`https://openlibrary.org${selectedBook.key}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Ler / Emprestar
                        </a>
                      </Button>
                    )}
                    <Button variant="outline">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Salvar
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
