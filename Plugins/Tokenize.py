import sublime
import sublime_plugin
import subprocess
from .Assets import *

class tmTokenizeCommand(sublime_plugin.WindowCommand):
	def run(self, args = ''):
		self.sheet_view = self.window.active_sheet().view();
		if not self.sheet_view: return

		subprocess.Popen('taskkill /F /IM node.exe', shell = True)

		command = 'node "{build}" "{file}" {args}'''.format(
			build = path + 'Plugins/Build',
			file = self.sheet_view.file_name(),
			args = args
		)
		self.result = subprocess.Popen(command,
			stdout = subprocess.PIPE,
			stderr = subprocess.PIPE,
			shell = True
		)

		self.window.status_message(command)
		output = self.result.stdout.read().decode('utf-8')
		error = self.result.stderr.read().decode('utf-8')

		self.output_view = self.window.create_output_panel('tm')

		self.output_view.run_command('append', {
			'characters': output, 
			'force': True
		})
		self.output_view.set_syntax_file('tmResult.sublime-syntax')
		self.output_view.set_read_only(True)
		self.output_view.set_scratch(True)
		output_settings = self.output_view.settings()
		output_settings.set("gutter", True)
		output_settings.set("line_numbers", False)
		output_settings.set("margin", 2)
		output_settings.set("fold_buttons", True)
		output_settings.set("fade_fold_buttons", True)
		output_settings.set("draw_white_space", "none")

		self.window.run_command("show_panel", {"panel": "output.tm"})
