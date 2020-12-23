import jinja2
from item_names import item_names


# item_names = ['Acceltra', 'Amprex', 'Arca Plasmor', 'Argonak', 'Astilla', 'Attica', 'Basmu', 'Battacor', 'Baza', 'Baza Prime', 'Boar', 'Boar Prime', 'Boltor', 'Boltor Prime', 'Braton Prime', 'Braton Vandal', 'Bubonico', 'Burston', 'Burston Prime', 'Buzlok', 'Cernos', 'Cernos Prime', 'Convectrix', 'Corinth', 'Corinth Prime', 'Cortege', 'Corvas']


def render_template(template_file_name, context, output_file_name):
    """Wrap up the Jinja2 template loading, rendering, and saving functionality."""
    # Render the template with the context
    template_loader = jinja2.FileSystemLoader(searchpath="./")
    template_env = jinja2.Environment(loader=template_loader)
    template = template_env.get_template(template_file_name)
    output_text = template.render(context)

    # Save the rendered text as a file
    with open(output_file_name, "w") as f:
        f.write(output_text)
    print("Output saved as " + output_file_name)


render_template("template.html", {"item_names": item_names}, "output_test.html")
