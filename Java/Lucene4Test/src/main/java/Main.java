import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopScoreDocCollector;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main
{
    public static String defaultIndexFolder = Main.class.getResource("indexes/").getFile();
    public static String defaultFilesFolder = Main.class.getResource("files/").getFile();

    public static void main(String[] args) throws IOException, ParseException {
        System.out.println("Enter the path where the index will be created: (e.g. /tmp/index or c:\\temp\\index): ");
        System.out.printf("(Default path: %s)\n", defaultIndexFolder);
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String buffer = br.readLine();
        String indexLocation = buffer.equals("")? defaultIndexFolder : buffer;
        if (buffer.equals("")) {
            System.out.println("Using default index folder.");
        }

        // create the index and add documents to the index
        createIndex(br, buffer, indexLocation);

        // now perform the search
        performSearch(br, indexLocation);
    }

    public static void createIndex(BufferedReader br, String indexLocation, String buffer) throws IOException {
        TextFileIndexer indexer = new TextFileIndexer(indexLocation);

        // read input from user until he decides to quit
        while (!buffer.equalsIgnoreCase("q")) {
            System.out.println("Enter the full path to add into the index (q=quit): (e.g. /home/ron/mydir or c:\\Users\\ron\\mydir)");
            System.out.println("[Acceptable file types: .xml, .html, .html, .txt]");
            buffer = br.readLine();
            if (buffer.equalsIgnoreCase("q")) {
                break;
            }
            // try to add files to the index
            indexer.indexFileOrDirectory(buffer);
        }

        // close the index to finalize creation of an index
        System.out.println("Completing index creation.");
        indexer.closeIndex();
    }

    public static void performSearch(BufferedReader br, String indexLocation) throws IOException, ParseException {
        IndexReader reader = DirectoryReader.open(FSDirectory.open(new File(indexLocation)));
        IndexSearcher searcher = new IndexSearcher(reader);

        String buffer = "";
        while (!buffer.equalsIgnoreCase("q")) {
            System.out.println("Enter the search query (q=quit):");
            buffer = br.readLine();
            if (buffer.equalsIgnoreCase("q")) {
                break;
            }

            TopScoreDocCollector collector = TopScoreDocCollector.create(5, true);
            Query query = new QueryParser(Version.LUCENE_40, "contents", TextFileIndexer.analyzer).parse(buffer);
            searcher.search(query, collector);
            ScoreDoc[] hits = collector.topDocs().scoreDocs;

            // display results
            System.out.println("Found " + hits.length + " hits.");
            int i = 0;
            for (ScoreDoc scoreDoc : hits) {
                int docId = scoreDoc.doc;
                Document d = searcher.doc(docId);
                System.out.println((++i) + ". " + d.get("path") + " score=" + scoreDoc.score);
            }

        }
    }
}
