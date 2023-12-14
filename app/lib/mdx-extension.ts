import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

export function headingTree() {
    return (node: any, file: any) => {
      file.data.headings = getHeadings(node);
    };
  }
   
  function getHeadings(root: any) {
    const nodes = {};
    const output: any[] = [];
    const indexMap = {};
    visit(root, "heading", (node) => {
      addID(node, nodes);
      transformNode(node, output, indexMap);
    });
   
    return output;
  }

function addID(node: any, nodes: any) {
    const id = node.children.map((c: any) => c.value).join("");
    nodes[id] = (nodes[id] || 0) + 1;
    node.data = node.data || {
      hProperties: {
        id: `${id}${nodes[id] > 1 ? ` ${nodes[id] - 1}` : ""}`
          .replace(/[^a-zA-ZіІїЇєЄґҐаА-яЯ\d\s-]/g, "")
          .split(" ")
          .join("-")
          .toLowerCase(),
      },
    };
  }

function transformNode(node: any, output: any, indexMap: any) {
  const transformedNode = {
    value: toString(node),
    depth: node.depth,
    data: node.data,
    children: [],
    parent: null, // Initialize parent property
  };

  if (node.depth === 1) {
    output.push(transformedNode);
    indexMap[node.depth] = transformedNode;
  } else {
    const parent = indexMap[node.depth - 1];
    if (parent) {
      transformedNode.parent = parent.data.hProperties.id; // Set the parent id
      parent.children.push(transformedNode);
      indexMap[node.depth] = transformedNode;
    }
  }
}
