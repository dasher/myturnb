# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch framework
load File.join(dir, '..', 'sdk', 'resources', 'themes')

# Look for any *.scss files in same directory as this file
# Place compiled *.css files in parent directory
sass_path 	= dir
css_path	= File.join(dir, "..")
# output_style	= :expanded
# environment	= :development
# Require any additional compass plugins here.
images_dir = File.join(dir, "..", "resources", "images")
images_path = images_dir
output_style	= :compressed
environment	= :production   
