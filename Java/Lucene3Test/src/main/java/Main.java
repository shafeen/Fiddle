import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.queryParser.ParseException;
import org.apache.lucene.queryParser.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;

import java.io.*;

public class Main
{
    // NOTE: paths relative to the maven "resources/" folder
    public static String indexPath = "/indexes";
    public static String filesPath = "/files";

    public static void indexFiles() throws IOException {
        System.out.println("Creating index at " + indexPath);
        Indexer indexer = new Indexer(Main.class.getResource(indexPath).getPath());
        indexer.indexFiles(Main.class.getResource(filesPath).getPath(), new FileFilter() {
            public boolean accept(File file) {
                return file.getName().toLowerCase().endsWith(".csv");
            }
        });
        indexer.closeIndex();
    }

    public static void searchFiles(String queryStr) throws IOException, ParseException {
        Directory dir = FSDirectory.open(new File(Main.class.getResource(indexPath).getPath()));
        IndexSearcher searcher = new IndexSearcher(dir);
        QueryParser queryParser = new QueryParser(Version.LUCENE_30,
                "contents",
                new StandardAnalyzer(Version.LUCENE_30));
        Query query = queryParser.parse(queryStr);
        // search for the actual query
        TopDocs hits = searcher.search(query, 10);
        System.out.printf("Found %d hits.\n", hits.totalHits);
        for (ScoreDoc s : hits.scoreDocs) {
            Document doc = searcher.doc(s.doc);
            System.out.println(doc.get("filepath"));
        }

    }

    public static void main(String[] args) throws IOException, ParseException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        System.out.print("Re-index files? (y/N)");
        if (br.readLine().equalsIgnoreCase("y")) {
            indexFiles();
        } else {
            System.out.println("Skipping file indexing");
        }

        String queryStr = "";
        while (!queryStr.equalsIgnoreCase("q")) {
            System.out.print("Enter query: ");
            queryStr = br.readLine();
            searchFiles(queryStr);
        }

    }

}
