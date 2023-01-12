#!/usr/bin/env node
const { Option, Command } = require('commander');
const path = require('path');
const { analyseProject } = require('ember-project-deprecation-analysis');
const { join } = require('path');
const { copy } = require('fs-extra');
const { writeFile, readFile } = require('fs/promises');

const program = new Command();

program
  .name('ember-project-deprecation-dashboard')
  .description('A tool for analysing component deprecation')
  .version(require(path.join(__dirname, 'package.json')).version);

program
  .command('output')
  .description(
    'Outputs JSON info about pod deprecations, component use, and more!'
  )
  .addOption(
    new Option('--project-path <path>', 'Path to Ember Project')
      .default(process.cwd())
      .env('PROJECT_PATH')
      .makeOptionMandatory()
  )
  .addOption(
    new Option('--pods-dir <path>', 'Directory for pod root')
      .env('PODS_DIR')
      .makeOptionMandatory()
  )
  .addOption(
    new Option(
      '-o, --output <path>',
      'Output path for dashboard project'
    ).makeOptionMandatory()
  )
  .addOption(
    new Option(
      '--rootUrl <path|url>',
      'Required if the dashboard is not hosted on your servers rootUrl'
    )
  )
  .action(async (options) => {
    const result = await analyseProject(options.projectPath, options.podsDir);

    await copy(join(__dirname, 'dist'), options.output);

    let indexFilePath = join(options.output, 'index.html');

    let indexFileContents = await readFile(indexFilePath, {
      encoding: 'utf-8',
    });

    let regex =
      /<meta name="ember-project-deprecation-dashboard\/config\/environment" content="(.*)" \/>/;
    let envString = indexFileContents.match(regex)[1];
    let envValue = JSON.parse(decodeURIComponent(envString));

    envValue.rootURL = options.rootUrl ?? '/';
    envValue.podDashboard.dataRoot = options.rootUrl ?? '/';
    envValue.podDashboard.podModuleDirectory =
      options.podsDir ?? envValue.podDashboard.podModuleDirectory;

    indexFileContents = indexFileContents.replace(
      regex,
      `<meta name="ember-project-deprecation-dashboard/config/environment" content="${encodeURIComponent(
        JSON.stringify(envValue)
      )}" />`
    );

    if (options.rootUrl) {
      indexFileContents = indexFileContents.replace(
        /"\/assets\//g,
        `"/${options.rootUrl}/assets/`
      );
    }

    await writeFile(indexFilePath, indexFileContents, { encoding: 'utf-8' });

    await writeFile(join(options.output, 'data.json'), JSON.stringify(result), {
      encoding: 'utf-8',
    });
  });

program.parse();
