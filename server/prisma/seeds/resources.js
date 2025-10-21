const { resourceBenchmarks } = require('./resourceBenchmarks');
const { resourceArticles } = require('./resourceArticles');
const { resourcePapers } = require('./resourcePapers');
const { resourceTags } = require('./resourceTags');
const { resourceBenchmarkTagLinks } = require('./resourceBenchmarkTagLinks');
const { resourceArticleTagLinks } = require('./resourceArticleTagLinks');
const { resourcePaperTagLinks } = require('./resourcePaperTagLinks');

/**
 * Seed resources (benchmarks, articles, papers, and tags)
 */
async function seedResources(prisma) {
  console.log('Seeding resource tags...');

  // Create tags first (they're referenced by all resource types)
  const createdTags = [];
  for (const tag of resourceTags) {
    const created = await prisma.resourceTag.upsert({
      where: { id: tag.id },
      update: tag,
      create: tag,
    });
    createdTags.push(created);
  }
  console.log(`✓ Created ${createdTags.length} resource tags`);

  console.log('Seeding resource benchmarks...');

  // Create benchmarks
  const createdBenchmarks = [];
  for (const benchmark of resourceBenchmarks) {
    const created = await prisma.resourceBenchmark.upsert({
      where: { id: benchmark.id },
      update: benchmark,
      create: benchmark,
    });
    createdBenchmarks.push(created);
  }
  console.log(`✓ Created ${createdBenchmarks.length} resource benchmarks`);

  console.log('Seeding resource articles...');

  // Create articles
  const createdArticles = [];
  for (const article of resourceArticles) {
    const created = await prisma.resourceArticle.upsert({
      where: { id: article.id },
      update: article,
      create: article,
    });
    createdArticles.push(created);
  }
  console.log(`✓ Created ${createdArticles.length} resource articles`);

  console.log('Seeding resource papers...');

  // Create papers
  const createdPapers = [];
  for (const paper of resourcePapers) {
    const created = await prisma.resourcePaper.upsert({
      where: { id: paper.id },
      update: paper,
      create: paper,
    });
    createdPapers.push(created);
  }
  console.log(`✓ Created ${createdPapers.length} resource papers`);

  console.log('Seeding resource tag links...');

  // Create benchmark-tag links
  let benchmarkLinkCount = 0;
  for (const link of resourceBenchmarkTagLinks) {
    await prisma.resourceBenchmarkTagLink.upsert({
      where: {
        benchmarkId_tagId: {
          benchmarkId: link.benchmarkId,
          tagId: link.tagId,
        },
      },
      update: {},
      create: link,
    });
    benchmarkLinkCount++;
  }
  console.log(`✓ Created ${benchmarkLinkCount} benchmark-tag links`);

  // Create article-tag links
  let articleLinkCount = 0;
  for (const link of resourceArticleTagLinks) {
    await prisma.resourceArticleTagLink.upsert({
      where: {
        articleId_tagId: {
          articleId: link.articleId,
          tagId: link.tagId,
        },
      },
      update: {},
      create: link,
    });
    articleLinkCount++;
  }
  console.log(`✓ Created ${articleLinkCount} article-tag links`);

  // Create paper-tag links
  let paperLinkCount = 0;
  for (const link of resourcePaperTagLinks) {
    await prisma.resourcePaperTagLink.upsert({
      where: {
        paperId_tagId: {
          paperId: link.paperId,
          tagId: link.tagId,
        },
      },
      update: {},
      create: link,
    });
    paperLinkCount++;
  }
  console.log(`✓ Created ${paperLinkCount} paper-tag links`);

  return {
    tags: createdTags,
    benchmarks: createdBenchmarks,
    articles: createdArticles,
    papers: createdPapers,
  };
}

module.exports = seedResources;
