import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopScoreDocCollector;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;

import java.io.*;

public class Main
{

    public static void main(String[] args) throws IOException, ParseException {
        System.out.print("Enter the path where the index will be created: (e.g. /tmp/index or c:\\temp\\index): ");
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String buffer = br.readLine();
        String indexLocation = buffer;
        // create the indexer
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
        indexer.closeIndex();

        // now perform the search
        IndexReader reader = DirectoryReader.open(FSDirectory.open(new File(indexLocation)));
        IndexSearcher searcher = new IndexSearcher(reader);
        TopScoreDocCollector collector = TopScoreDocCollector.create(5, true);

        buffer = "";
        while (!buffer.equalsIgnoreCase("q")) {
            System.out.println("Enter the search query (q=quit):");
            buffer = br.readLine();
            if (buffer.equalsIgnoreCase("q")) {
                break;
            }

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
