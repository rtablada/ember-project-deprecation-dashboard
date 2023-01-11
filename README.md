# Ember Project Deprecation Dashboard

This project creates a dashboard output to visualize Ember deprecations related to the 3.x to 4.x upgrade path.

The intent is for this tool to be a launching off point that can allow users to build better analysis and visualizations for their applications

## Using this package

Currently this tool has one command: `output` which will run `ember-project-deprecation-analysis` on the configured project and then output to a given output directory

```sh
npx ember-project-deprecation-dashboard output -o pod-dashboard
```

For up to date help and to learn about the available CLI options or configurable ENV variables, use:

```
npx ember-project-deprecation-dashboard output -h
```

## Caveats

This tool uses `ember-project-deprecation-analysis` under the hood. That tool currently is built around pod folder structures and colocated templates vs JS files.
The tool could (and should) be refactored into a more directory structure agnostic format to allow for better use across all applications, but currently this tool likely has little use for non-pods users.

This is also VERY VERY alpha OSS and subject to dogfooding at my current projects.
Please report any issues or contribute to this project or the associated https://github.com/rtablada/pod-deprecation-analysis repo.
