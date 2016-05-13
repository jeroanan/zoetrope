(defun cherrypy-endpoint ()
  "Create a new endpoint for cherrypy"
  (interactive "*")
  (setq endpoint-name (read-string "Endpoint name: "))
  (insert "@cherrypy.expose\n")
  (insert "def " endpoint-name "(self, **kwargs):\n")
  (indent-relative-previous-line)
  (zoetrope-factory-and-execute)
  )

(defun zoetrope-factory-and-execute ()
  (interactive "*")
  (setq command-name (read-string "Comand name: "))
  (insert "command = self.__rpc_factory.create('" command-name "')\n")
  (indent-relative-previous-line)
  (insert "command.execute()\n")
  (indent-relative-previous-line))

(defun indent-relative-previous-line ()
  (previous-line)
  (indent-according-to-mode)
  (next-line))
  

