#!/bin/bash

# Check if a component name was provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <ComponentName> [subdirectory]"
    echo "Example: $0 UserProfile components"
    echo "Component will be created in ./src/[subdirectory]"
    echo "If no subdirectory is specified, component will be created directly in ./src"
    exit 1
fi

# Get the component name from the first argument
COMPONENT_NAME=$1

# Get the subdirectory (if provided), otherwise use empty string
SUB_DIR=${2:-""}

# Construct the full directory path
# If SUB_DIR is empty, this will just be "src"
# If SUB_DIR is provided, this will be "src/subdirectory"
DIR_PATH="src"
if [ ! -z "$SUB_DIR" ]; then
    DIR_PATH="src/$SUB_DIR"
fi

# Create the component directory
mkdir -p "$DIR_PATH/$COMPONENT_NAME"

# Create index.tsx
cat > "$DIR_PATH/$COMPONENT_NAME/index.tsx" << EOL
import $COMPONENT_NAME from "./${COMPONENT_NAME}Container";

export default $COMPONENT_NAME;
EOL

# Create ComponentNameContainer.tsx
cat > "$DIR_PATH/$COMPONENT_NAME/${COMPONENT_NAME}Container.tsx" << EOL
import React from 'react';
import ${COMPONENT_NAME}View from './${COMPONENT_NAME}View';

const ${COMPONENT_NAME}Container: React.FC = () => {
  // Add your container logic here
  return <${COMPONENT_NAME}View />;
};

export default ${COMPONENT_NAME}Container;
EOL

# Create ComponentNameView.tsx
cat > "$DIR_PATH/$COMPONENT_NAME/${COMPONENT_NAME}View.tsx" << EOL
import React from 'react';

interface ${COMPONENT_NAME}ViewProps {
  // Add your props here
}

const ${COMPONENT_NAME}View: React.FC<${COMPONENT_NAME}ViewProps> = () => {
  return (
    <div>
      {/* Add your JSX here */}
      ${COMPONENT_NAME} Component
    </div>
  );
};

export default ${COMPONENT_NAME}View;
EOL

echo "Component $COMPONENT_NAME created successfully in $DIR_PATH/$COMPONENT_NAME!"