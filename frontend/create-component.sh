#!/bin/bash

# Check if a component name was provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <ComponentName> [directory]"
    echo "Example: $0 UserProfile pages/loggedInLayout"
    echo "If no directory is specified, the component will be created in ./src"
    exit 1
fi

# Get the component name from the first argument
COMPONENT_NAME=$1

# Get the directory path (default to ./src if not provided)
DIR_PATH=${2:-src}

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