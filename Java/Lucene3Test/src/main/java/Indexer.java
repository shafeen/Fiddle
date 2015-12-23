import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;

import java.io.*;

public class Indexer {

    private IndexWriter writer;

    public Indexer(String indexDir) throws IOException {
        Directory dir = FSDirectory.open(new File(indexDir));
        this.writer = new IndexWriter(dir, new StandardAnalyzer(Version.LUCENE_30), true, IndexWriter.MaxFieldLength.UNLIMITED);
    }

    public void closeIndex() throws IOException {
        this.writer.close();
    }

    private Document createDocumentFromFile(File file) throws IOException {
        Document document = new Document();
        document.add(new Field("contents", new FileReader(file)));
        document.add(new Field("filename", file.getName(), Field.Store.YES, Field.Index.NOT_ANALYZED));
        document.add(new Field("filepath", file.getCanonicalPath(), Field.Store.YES, Field.Index.NOT_ANALYZED));
        return document;
    }

    private void indexSingleFile(File file) throws IOException {
        System.out.printf("Indexing %s\n", file.getCanonicalPath());
        writer.addDocument(createDocumentFromFile(file));
    }

    public int indexFiles(String filesDir, FileFilter fileFilter) throws IOException {
        File[] files = (new File(filesDir)).listFiles();
        if (files == null) {
            return 0;
        }
        // NOTE: notice that we do not recursively index files in the directory
        for (File f : files) {
            if (!f.isDirectory() && !f.isHidden() && f.exists() && f.canRead()
                    && (fileFilter == null || fileFilter.accept(f))) {
                indexSingleFile(f);
            }
        }
        return this.writer.numDocs();
    }
}
