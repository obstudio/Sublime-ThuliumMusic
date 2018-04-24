import sublime
import sublime_plugin
import subprocess
from .Assets import *

def isThuliumFile(filename):
	fileExt = os.path.splitext(filename)[1]
	if fileExt == '.tm':
		return True
	else:
		return False

class tmExecuteCommand(sublime_plugin.WindowCommand):

	def run(self, meta = ''):
		self.sheet_view = self.window.active_sheet().view()
		if not self.sheet_view: 
			self.window.status_message('File was not found.')
			return

		file_name = self.sheet_view.file_name()
		if not isThuliumFile(file_name): 
			self.window.status_message('File extension should be ".tm".')
			return

		subprocess.Popen('taskkill /F /IM node.exe', shell = True)

		command = 'node "{build}" "{file}" {args}'.format(
			build = path + 'Plugins/Build',
			file = file_name,
			args = meta
		)
		result = subprocess.Popen(command,
			stdout = subprocess.PIPE,
			stderr = subprocess.PIPE,
			shell = True
		)

		self.window.status_message(command)
		output = result.stdout.read().decode('utf-8')
		error = result.stderr.read().decode('utf-8')

		self.output_view = self.window.create_output_panel('tm')

		self.output_view.run_command('append', {
			'characters': command, 
			'force': True
		})
		self.output_view.set_syntax_file('tmResult.sublime-syntax')
		self.output_view.set_read_only(True)
		self.output_view.set_scratch(True)
		output_settings = self.output_view.settings()
		output_settings.set("gutter", False)
		output_settings.set("show_definitions", False)
		output_settings.set("draw_white_space", "none")

		self.window.run_command("show_panel", {"panel": "output.tm"})
