import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class TextFileIndexer {

    public static StandardAnalyzer analyzer = new StandardAnalyzer(Version.LUCENE_40);

    private IndexWriter writer;
    private ArrayList<File> queue = new ArrayList<File>();

    public TextFileIndexer(String indexDir) throws IOException {
        FSDirectory dir = FSDirectory.open(new File(indexDir));
        IndexWriterConfig config = new IndexWriterConfig(Version.LUCENE_40, TextFileIndexer.analyzer);
        this.writer = new IndexWriter(dir, config);
    }


    private boolean isTextFile(File file) {
        String filename = file.getName().toLowerCase();
        return filename.endsWith(".htm") || filename.endsWith(".html") ||
                filename.endsWith(".xml") || filename.endsWith(".txt") || filename.endsWith(".json");
    }

    // add relevant files to our "queue" of files
    private void addFiles(File file) {
        if (!file.exists()) {
            System.out.println(file + " doesn't exist");
        }

        if (file.isDirectory()) {
            for (File f : file.listFiles()) {
                this.addFiles(f);
            }
        } else {
            if (isTextFile(file)) {
                this.queue.add(file);
            } else {
                System.out.println("Skipped " + file.getName().toLowerCase());
            }
        }
    }

    public void indexFileOrDirectory(String filename) throws IOException {
        // update the list of files
        this.addFiles(new File(filename));

        int originalNumDocs = writer.numDocs();
        //
        for (File f : this.queue) {
            FileReader fr = null;

            Document doc = new Document();
            // add contents of the file
            fr = new FileReader(f);
            doc.add(new TextField("contents", fr));
            doc.add(new StringField("path", f.getPath(), Field.Store.YES));
            doc.add(new StringField("filename", f.getName(), Field.Store.YES));

            writer.addDocument(doc);
            System.out.println("Added :" + f);
        }

        int newNumDocs = writer.numDocs();
        System.out.println("");
        System.out.println("************************");
        System.out.println((newNumDocs - originalNumDocs) + " documents added.");
        System.out.println("************************");

        this.queue.clear();
    }

    public void closeIndex() throws IOException {
        this.writer.close();
    }




}
